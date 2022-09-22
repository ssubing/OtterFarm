package com.a606.api.service;

import com.a606.api.dto.InventoryDto;
import com.a606.api.dto.ItemDto;
import com.a606.db.entity.Inventory;
import com.a606.db.entity.Item;
import com.a606.db.repository.InventoryRepository;
import com.a606.db.repository.ItemRepository;
import com.a606.db.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class ShopServiceImpl implements ShopService{
    InventoryRepository inventoryRepository;
    ItemRepository itemRepository;
    UserRepository userRepository;

    @Override
    public List<InventoryDto> getInventory(long userId) {
        List<Inventory> list = inventoryRepository.findAll();
        List<InventoryDto> result = new ArrayList<>();
        for(int i = 0; i < list.size(); i++) {
            if(list.get(i).getId() == userId) {
                InventoryDto inventoryDto = new InventoryDto();
                inventoryDto.setId(list.get(i).getId());
                inventoryDto.setItem(list.get(i).getItem());
                inventoryDto.setNumber(list.get(i).getNumber());
                inventoryDto.setUserId(userId);

                result.add(inventoryDto);
            }
        }
        return result;
    }

    @Override
    public ItemDto getRandomItem() {
        List<Item> list = itemRepository.findAll();
        int size = list.size();
        Random rd = new Random();
        int randomId = rd.nextInt(size);

        Item item = itemRepository.findById((long) randomId).get();
        ItemDto itemDto = new ItemDto();
        itemDto.setId(item.getId());
        itemDto.setType(item.getType());
        itemDto.setNumber(item.getNumber());
        itemDto.setRgb(item.getRgb());


        return itemDto;
    }

    @Override
    public List<InventoryDto> updateInventory(long userId, ItemDto itemDto) {
        List<Inventory> list = inventoryRepository.findAll();
        Item item = itemRepository.findById(itemDto.getId()).get();
        boolean isInInventory = false;
        List<InventoryDto> result = new ArrayList<>();
        for(int i = 0; i < list.size(); i++) {
            if(list.get(i).getId() == userId) {
                if(list.get(i).getItem().equals(item)) {
                    list.get(i).setNumber(list.get(i).getNumber()+1);
                    inventoryRepository.save(list.get(i));
                    isInInventory = true;
                }
                InventoryDto inventoryDto = new InventoryDto();
                inventoryDto.setId(list.get(i).getId());
                inventoryDto.setItem(list.get(i).getItem());
                inventoryDto.setNumber(list.get(i).getNumber());
                inventoryDto.setUserId(userId);


                result.add(inventoryDto);
            }
        }
        if(isInInventory) return result;
        else {
            Inventory inventory = new Inventory();
            inventory.setUser(userRepository.findById(userId).get());
            inventory.setItem(item);
            inventory.setNumber(1);
            inventoryRepository.save(inventory);
        }
        return result;
    }
}
