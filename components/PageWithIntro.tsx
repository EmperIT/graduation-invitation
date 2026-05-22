"use client";

import NewInvitationLayout from "./NewInvitationLayout";

export default function PageWithIntro({ dearName }: { dearName?: string }) {
    return (
        <div className="relative min-h-[100dvh] overflow-hidden w-full">
            <NewInvitationLayout dearName={dearName} />
        </div>
    );
}
