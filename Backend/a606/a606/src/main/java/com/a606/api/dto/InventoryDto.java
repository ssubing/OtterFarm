package com.a606.api.dto;

import com.a606.db.entity.Item;
import com.a606.db.entity.User;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InventoryDto {
    private long id;
    private long userId;
    private Item item;
    private int number;
}
