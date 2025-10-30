import Link from 'next/link'

interface EmptyStateProps {
  title: string
  description: string
  showCreateLink?: boolean
}

export function EmptyState({
  title,
  description,
  showCreateLink = true,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">📦</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {showCreateLink && (
        <Link
          href="/create-product"
          className="btn-primary"
        >
          Create Product
        </Link>
      )}
    </div>
  )
}
