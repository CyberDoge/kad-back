export type UserDetailsRequest = {
    avatarUrl?: string,
    firstName: string,
    secondName: string,
    thirdName?: string,
    emails?: string[],
    phones?: string[],
}
