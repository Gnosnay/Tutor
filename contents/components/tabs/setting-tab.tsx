import { XMarkIcon } from "@heroicons/react/24/outline"

import { RawPage } from "~contents/components/pages/page-template"

export const SettingsTab = ({ onCloseClick }: { onCloseClick: () => void }) => {
  return (
    <RawPage
      title="Settings"
      className="tutor-flex tutor-items-center tutor-justify-center 
    tutor-flex-col tutor-space-y-4 tutor-h-screen"
      rightIconBtn={{
        icon: <XMarkIcon className="tutor-h-4 tutor-w-4" />,
        onClick: onCloseClick
      }}>
      Comming soon
    </RawPage>
  )
}
