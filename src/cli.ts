#!/usr/bin/env node

import { MetadataGenerator } from './generator';
import * as path from 'path';
import * as fs from 'fs';

const generator = new MetadataGenerator();

const srcDir = path.join(process.cwd(), 'src');

if (!fs.existsSync(srcDir)) {
    console.error('Error: src directory not found');
    process.exit(1);
}

const metadata = generator.generateMetadata(srcDir);

const outputPath = path.join(process.cwd(), 'course-metadata.json');
fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));

console.log(`Metadata generated successfully: ${outputPath}`);