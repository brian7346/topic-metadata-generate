import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import { CourseMetadata, TopicMetadata } from './types';

export class MetadataGenerator {
    private extractMetadataFromFile(filePath: string): TopicMetadata | null {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const fileName = path.basename(filePath);
            
            const metadataMatch = content.match(/\/\*\s*@metadata\s*({[\s\S]*?})\s*\*\//);
            
            if (metadataMatch) {
                try {
                    const metadata = JSON.parse(metadataMatch[1]);
                    return {
                        id: fileName,
                        title: metadata.title || this.formatTitle(fileName),
                        descriptionVideoId: metadata.descriptionVideoId || "",
                        solutionVideoId: metadata.solutionVideoId || ""
                    };
                } catch (e) {
                    console.warn(`Failed to parse metadata in ${filePath}`);
                    return null;
                }
            }
            
            return {
                id: fileName,
                title: this.formatTitle(fileName),
                descriptionVideoId: "",
                solutionVideoId: ""
            };
        } catch (error) {
            console.error(`Error processing file ${filePath}:`, error);
            return null;
        }
    }

    private formatTitle(id: string): string {
        const nameWithoutExt = id.replace(/\.[^/.]+$/, "");
        return nameWithoutExt
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    public generateMetadata(srcDir: string): CourseMetadata {
        const problems: TopicMetadata[] = [];
        
        const files = glob.sync('**/*.ts', { cwd: srcDir });
        
        for (const file of files) {
            if (file.includes('index.ts') || file.includes('types.ts') || file.includes('generator.ts')) {
                continue;
            }
            
            const fullPath = path.join(srcDir, file);
            const metadata = this.extractMetadataFromFile(fullPath);
            
            if (metadata) {
                problems.push(metadata);
            }
        }
        
        problems.sort((a, b) => a.id.localeCompare(b.id));
        
        return { problems };
    }
}