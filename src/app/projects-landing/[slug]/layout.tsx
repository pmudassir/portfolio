// Landing pages are fully isolated — no portfolio header/footer.
// They inherit the root layout (html/body/fonts) but nothing else.
export default function ProjectLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
