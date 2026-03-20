import Tiptap from "../components/Tiptap"
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'


export default function Create() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
          Create Post
        </h1>
        <SimpleEditor />
      </div>
    </div>
  )
}