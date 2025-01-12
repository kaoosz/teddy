export interface CreateUrlDto {
    original_url: string;
    short_url: string;
    user_id?: number;
}

// export interface UpdateUrlDto implements CreateUrlDto{
//     original_url: Omit<>
// }