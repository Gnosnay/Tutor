import ReactMarkdown from '~node_modules/react-markdown/react-markdown.min.js'
import remarkGfm from 'remark-gfm'
import { RawPage } from './page-template'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from '~contents/utils/router'

export const DocumentPage = ({ title, markdown }: { title: string, markdown: string }) => {
    // plugin related: https://github.com/remarkjs/react-markdown/issues/526#issuecomment-751791923
    // ReactMarkdown related: https://github.com/PlasmoHQ/plasmo/issues/774#issuecomment-1849253854
    const router = useRouter();

    return <RawPage title={title} leftIconBtn={
        { icon: <ArrowLeftIcon className="tutor-h-4 tutor-w-4" />, onClick: () => { router.prevPage() } }
    }>
        <article className="tutor-prose tutor-px-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]} >{markdown}</ReactMarkdown>
        </article>
    </RawPage>
}