package com.a606.api.service;

import com.a606.api.dto.InventoryDto;
import com.a606.api.dto.ItemDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public interface ShopService {


    @Transactional
    List<InventoryDto> getInventory(long userId);

    @Transactional
    ItemDto getRandomItem();

    @Transactional
    List<InventoryDto> updateInventory(long userId, ItemDto itemDto);
}
