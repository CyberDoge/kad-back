export type CurrentUserResponse = {
    id: string,
    roles: string[],
    avatarUrl?: string,
    firstName?: string,
    secondName?: string
    thirdName?: string
    emails: string[],
    phones: string[],
    primaryEmail: string,
    workExperienceArray?: WorkExperience[],
    pdfResume?: string
}

type WorkExperience = {
    placeOfWork: string,
    position: string,
    dateFrom: string,
    dateTo: string,
    description?: string
}
