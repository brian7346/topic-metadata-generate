export interface TopicMetadata {
    id: string;
    title: string;
    descriptionVideoId: string;
    solutionVideoId: string;
}

export interface CourseMetadata {
    problems: TopicMetadata[];
}