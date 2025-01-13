export interface IUrl {
    id: number;
    original_url: string;
    short_url: string;
    user_id?: number | null;
    click_count: number;
    created_at: Date;
    updated_at?: Date | null;
    deleted_at?: Date | null;
}

