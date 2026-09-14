import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { EmptyState } from "@/components/ui"
export default async function ProductDetailPage({ params }: { params: Promise<{ productId: string }> }) { await params; return <><Link href="/app/products" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"><ArrowLeft data-icon="inline-start" />Back to products</Link><EmptyState title="Product details are ready for API data" description="This route is reserved for product metadata, image previews, and generation actions from the NestJS service." /></> }
