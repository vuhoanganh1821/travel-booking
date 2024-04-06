export function getRatingStars(rating: number): string[] {
  return Array.from({ length: rating }).map((_, index) => 'yellow-star.svg')
}