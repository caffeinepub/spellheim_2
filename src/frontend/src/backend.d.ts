import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CharacterProfile {
    audioVolume: bigint;
    name: string;
    archetype: string;
    cosmeticOptions: Array<string>;
    basicStats: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerCharacterProfile(): Promise<CharacterProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCharacterProfile(principal: Principal): Promise<CharacterProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCharacterProfile(profile: CharacterProfile): Promise<void>;
}
