import type { ReactNode } from "react"
import type { ReactElement } from "react-markdown/lib/react-markdown"

export interface IconBtn {
    icon: ReactElement,
    onClick: () => void,
}


export const RawPage = ({ title, leftIconBtn, rightIconBtn, children }: { title: string, leftIconBtn?: IconBtn, rightIconBtn?: IconBtn, children: ReactNode }) => {

    return (
        <div>
            <div className="tutor-navbar tutor-px-4 tutor-bg-base-100 tutor-w-full tutor-h-full">
                <div className="tutor-flex-1">
                    {leftIconBtn ? <button className="tutor-btn tutor-btn-circle tutor-btn-sm tutor-mr-2" onClick={leftIconBtn.onClick}>
                        {leftIconBtn.icon}
                    </button> : <div />}
                    <h2 className="tutor-card-title">{title}</h2>
                </div>
                <div className="tutor-flex-none">
                    {rightIconBtn ? <button className="tutor-btn tutor-btn-circle tutor-btn-sm" onClick={rightIconBtn.onClick}>
                        {rightIconBtn.icon}
                    </button> : <div />}
                </div>
            </div>
            <div className="tutor-w-full tutor-relative tutor-border-b tutor-border-gray-300"></div>
            <div className="tutor-px-4 tutor-py-2">
                {children}
            </div >
        </div >
    )
}