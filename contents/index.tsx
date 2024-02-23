import cssText from "data-text:~/contents/style.css"
import { useState } from 'react'
import Button from "./components/button"
import Drawer from "./components/drawer"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { getNotices } from "./utils/docs-query"
import uniqid from 'uniqid';

const queryClient = new QueryClient()

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const AppContainer = () => {
  const [isDrawerShown, setIsDrawerShown] = useState<boolean>(false);
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: getNotices,
  })
  const [hiddenNoticeIds, setHiddenNoticeIds] = useState<number[]>([]);

  return (
    <div>
      {isDrawerShown
        ? <Drawer onCloseEvent={() => { setIsDrawerShown(false) }} />
        : <Button
          className="tutor-z-50 tutor-fixed tutor-top-32 tutor-right-0 tutor-w-12 tutor-h-10"
          onClick={() => { setIsDrawerShown(true) }}
        />}
      {isPending ? <></> : data.filter(e => !hiddenNoticeIds.includes(e.id)).map(item =>
        <div key={uniqid()} role="alert" className="tutor-alert tutor-shadow-lg tutor-m-5">
          <InformationCircleIcon className="tutor-h-6 tutor-w-6" />
          <div>
            <h3 className="tutor-font-bold">{item.title}</h3>
            <div className="tutor-text-xs">{item.brief}</div>
          </div>
          <button className="tutor-btn tutor-btn-sm tutor-btn-primary" onClick={() => {
            setHiddenNoticeIds([...hiddenNoticeIds, item.id])
          }}>Close</button>
        </div>)}
    </div>
  )
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer />
    </QueryClientProvider>
  )
}

export default App
