<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep all mock forecast generation behind `src/data/providers.ts`, uniformly pessimistic, and deterministic from normalized names/areas so future APIs can replace it cleanly.
- Keep demo-tier entitlements in one configuration module and app-wide plan/shortlist state in React context so both routes stay synchronized.
