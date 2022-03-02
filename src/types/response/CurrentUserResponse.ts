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
}
