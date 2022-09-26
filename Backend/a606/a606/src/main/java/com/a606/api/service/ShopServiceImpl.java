package com.a606.api.service;

import com.a606.api.dto.InventoryDto;
import com.a606.api.dto.ItemDto;
import com.a606.api.dto.MyNFTDto;
import com.a606.db.entity.*;
import com.a606.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class ShopServiceImpl implements ShopService{
    @Autowired
    InventoryRepository inventoryRepository;
    @Autowired
    ItemRepository itemRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    IssuedAvatarRepository issuedAvatarRepository;
    @Autowired
    NFTRepository nftRepository;

    @Autowired
    ContractService contractService;

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

    @Override
    public Long checkDuplicated(long head, long eyes, long mouth, long hands, long fashion) {
        Optional<IssuedAvatar> issuedAvatar = issuedAvatarRepository.findByHeadAndEyesAndMouthAndHandsAndFashion(head, eyes, mouth, hands, fashion);
        if(issuedAvatar.isPresent()){
            return issuedAvatar.get().getNftId();
        }

        return null;
    }

    @Override
    public boolean checkItems(User user, List<Long> itemIds) {
        int type = 1;
        for(Long itemId : itemIds){
            // item이 존재하지 않거나 타입에 맞지 않는 경우
            Optional<Item> item = itemRepository.findById(itemId);
            if(!item.isPresent() || item.get().getType() != type){ return false; }
            type++;

            // item을 보유하고 있지 않은 경우
            Optional<Inventory> inventory = inventoryRepository.findByUserAndItem(user, item.get());
            if(!inventory.isPresent() || inventory.get().getNumber() < 1){ return false; }
            System.out.println(type + " clear");
        }
        return true;
    }

    @Override
    public Long createNFT(User user, List<Long> itemIds, String tokenURI, String name) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        for(Long itemId : itemIds){
            Item item = itemRepository.findById(itemId).get();
            Inventory inventory = inventoryRepository.findByUserAndItem(user, item).get();
            inventory.setNumber(inventory.getNumber() - 1);
            inventoryRepository.save(inventory);
            stringBuilder.append(String.format("%02d", item.getNumber())).append(String.format("%02d", item.getRgb()));
        }
        System.out.println("dna : " + stringBuilder.toString());
        String tokenId = contractService.createNFT(user.getWallet(), stringBuilder.toString(), tokenURI);
        if (tokenId.equals("")) {
            return null;
        }

        NFT nft = new NFT();
        nft.setTokenId(tokenId);
        nft.setSaled(false);
        nft.setName(name);
        nft.setLikeCount(0);
        nft = nftRepository.save(nft);

        IssuedAvatar issuedAvatar = new IssuedAvatar();
        issuedAvatar.setHead(itemIds.get(0));
        issuedAvatar.setEyes(itemIds.get(1));
        issuedAvatar.setMouth(itemIds.get(2));
        issuedAvatar.setHands(itemIds.get(3));
        issuedAvatar.setFashion(itemIds.get(4));
        issuedAvatar.setNftId(nft.getId());
        issuedAvatar.setFirstUserId(user.getId());
        issuedAvatarRepository.save(issuedAvatar);

        return nft.getId();
    }
}
