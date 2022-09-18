package com.a606.api.controller;

import com.a606.api.service.ShopService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Api(value = "상점 API", tags = {"Shop"})
@RestController
@RequestMapping("api/")
@RequiredArgsConstructor
public class ShopController {
    ShopService shopService;


}
