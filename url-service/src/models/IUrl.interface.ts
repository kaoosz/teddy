export interface IUrl {
    id: number;
    original_url: string;
    short_url: string;
    user_id?: number;
    click_count: number;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

