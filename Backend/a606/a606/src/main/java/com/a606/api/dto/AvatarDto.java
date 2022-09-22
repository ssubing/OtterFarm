package com.a606.api.dto;

import com.a606.db.entity.Item;
import com.a606.db.entity.User;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AvatarDto {

    private long id;
    private long userId;
    private Item head;
    private Item eyes;
    private Item mouth;
    private Item hands;
    private Item fashion;
}
