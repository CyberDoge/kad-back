export type UserCompetenceRequest = {
    workExperienceArray: WorkExperience[],
    pdfResume?: string
}

type WorkExperience = {
    placeOfWork: string,
    position: string,
    dateFrom: string,
    dateTo: string,
    description?: string
}
