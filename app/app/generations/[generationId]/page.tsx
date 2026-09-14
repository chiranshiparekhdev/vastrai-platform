import { EmptyState } from "@/components/ui"
export default async function GenerationDetailPage({ params }: { params: Promise<{ generationId: string }> }) { await params; return <EmptyState title="Generation details" description="The generation preview and status timeline will be populated from the API here." /> }
