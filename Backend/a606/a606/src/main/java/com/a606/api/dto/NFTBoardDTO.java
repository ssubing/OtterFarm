package com.a606.api.dto;

import com.a606.db.entity.UserPage;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("NFTBoardDTO")
public class NFTBoardDTO {

    private Long id;
    private String channelPassword;
    private String tokenURI;
    private UserPage userPage;
    private boolean is_saled;
    private String name;
    private int likeCount;


}
