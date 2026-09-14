import { EmptyState } from "@/components/ui"
export default async function PosterDetailPage({ params }: { params: Promise<{ posterId: string }> }) { await params; return <EmptyState title="Poster details" description="Poster composition, export, and sharing controls will be connected here." /> }
