export interface TopicMetadata {
    id: string;
    name: string
    descriptionVideoId: string;
    solutionVideoId: string;
}

export interface CourseMetadata {
    problems: TopicMetadata[];
}