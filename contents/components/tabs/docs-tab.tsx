import DrawerMainPage from "~contents/components/pages/drawer-main-page"
import { RouterContainer } from "~contents/utils/router"

export const DocTab = ({ onCloseClick }: { onCloseClick: () => void }) => {
  return (
    <RouterContainer>
      <DrawerMainPage onClose={onCloseClick} />
    </RouterContainer>
  )
}
