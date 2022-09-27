package com.a606.api.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BidBoardDto {

    private long id;
    private LocalDateTime start;
    private LocalDateTime end;
    private double first_price;
    private List<LogsDto> bidLogs;
}
