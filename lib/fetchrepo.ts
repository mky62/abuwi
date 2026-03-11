export type Repo = {
    id: number
    full_name: string
    name?: string
    html_url?: string
    stargazers_count: number
    language: string | null
    pushed_at?: string
    forks?: number
}

function requireOk(res: Response, context: string) {
    if (res.ok) return;
    throw new Error(`${context} failed (${res.status})`);
}

export async function fetchRepo(
  token?: string
): Promise<Repo[]> {

    const url = `https://api.github.com/user/repos?per_page=100&sort=updated`;

    const headers: Record<string, string> = {
        Accept: "application/vnd.github+json",
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(url, {
        method: "GET",
        headers,
        cache: "no-store",
    });

    requireOk(res, "GitHub repos fetch");

    const json = await res.json();

    if (!Array.isArray(json)) return [];
    return json as Repo[];
}