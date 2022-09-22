package com.a606.api.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {
    private long id;
    private int type;
    private int number;
    private int rgb;
}
