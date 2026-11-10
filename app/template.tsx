/** Transition douce à chaque changement de page (fondu + balayage tricolore). */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="page-sweep" aria-hidden="true" />
      <div className="animate-page-in">{children}</div>
    </>
  );
}
