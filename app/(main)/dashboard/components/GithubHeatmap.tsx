"use client";

import { GitHubCalendar } from "react-github-calendar";

export default function GithubHeatmap({ username }: { username: string }) {
    // Custom theme matching the premium dark & amber aesthetic
    const explicitTheme = {
        light: ["#ebedf0", "#b3f6beff", "#74f07eff", "#56ea35ff", "#42d906ff"],
        dark: ["#1f1f22", "#78350f", "#92400e", "#b45309", "#d97706"],
    };

    return (
        <div className="max-w-[980px] flex justify-center py-2 px-2 rounded-2xl bg-sky-200 backdrop-blur-sm shadow-xl mt-4">
            <div className="max-w-full overflow-x-auto custom-scrollbar">
                <GitHubCalendar
                    username={username}
                    theme={explicitTheme}
                    colorScheme="light"
                    blockSize={12}
                    blockMargin={5}
                    fontSize={12}
                    year={new Date().getFullYear()}
                />
            </div>
        </div>
    );
}
