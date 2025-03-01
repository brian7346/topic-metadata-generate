export interface TopicMetadata {
    id: string;           // ID задачи (например, "01-basic-types")
    name: string;         // Название задачи
    descriptionVideoId: string;  // Описание задачи
    solutionVideoId: string;     // ID видео с решением
}

export interface CourseMetadata {
    problems: TopicMetadata[];
}