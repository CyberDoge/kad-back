export type CurrentUserResponse = {
    id: string,
    roles: string[],
    avatarUrl?: string,
    fullName?: string,
    emails: string[],
    phones: string[],
    primaryEmail: string,
}
