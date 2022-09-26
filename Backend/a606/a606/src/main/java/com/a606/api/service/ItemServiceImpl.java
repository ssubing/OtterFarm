package com.a606.api.service;

import com.a606.api.dto.ItemDto;
import com.a606.db.entity.Item;
import com.a606.db.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService{
    @Autowired
    ItemRepository itemRepository;

    @Override
    public void createItem(int type, int number, int rgb, int rare) {
        Item item = new Item();
        item.setType(type);
        item.setNumber(number);
        item.setRgb(rgb);
        item.setRare(rare);

        itemRepository.save(item);
    }

    @Override
    public List<ItemDto> getAllItems() {
        List<Item> items = itemRepository.findAll();
        List<ItemDto> list = new ArrayList<>();
        for(Item i : items) {
            ItemDto itemDto = new ItemDto();
            itemDto.setId(i.getId());
            itemDto.setType(i.getType());
            itemDto.setNumber(i.getNumber());
            itemDto.setRgb(i.getRgb());
            itemDto.setRare(i.getRare());
            list.add(itemDto);
        }
        return list;
    }

    @Override
    public void updateItem(long itemId, int type, int number, int rgb, int rare) {
        Item item = itemRepository.findById(itemId).get();
        item.setType(type);
        item.setNumber(number);
        item.setRgb(rgb);
        item.setRare(rare);
        itemRepository.save(item);
    }

    @Override
    public void deleteItem(long itemId) {
        itemRepository.deleteById(itemId);
    }
}
