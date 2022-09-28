package com.a606.api.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LogsDto {
    private LocalDateTime date;
    private double price;
}
