
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { AccountAccess, User } from "@prisma/client";

export const userDetailsState = atom<User>({
    key: "userDetailsState", // Unique key for this atom
    default: {
        creditsUsed: 0,
        creditsTotal: 0,
        access: AccountAccess.TRIAL,
        name: "",
        email: "",
        emailVerified: false,
        role: "user",
        image: "",
        id: "",
        password: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        banned: false,
        bannedReason: null,
        banExpires: null,
    } // Initial empty array of notifications
});

// Optional: Selector hook for components that only need to read user details
export function useUserDetails() {
    const [userDetails] = useRecoilState(userDetailsState);
    return userDetails;
}

// Optional: Selector hook for components that only need to modify user details
export function useSetUserDetails() {
    const setUserDetails = useSetRecoilState(userDetailsState);
    return setUserDetails
}