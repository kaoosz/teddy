export interface CreateUrlDto {
    original_url: string;
    short_url: string;
    user_id?: number | null;
}
