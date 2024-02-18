import type { ReactElement } from "react";

export interface Router {
    nextPage(page: ReactElement): void;
    prevPage(): void;
}