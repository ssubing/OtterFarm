package com.a606.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.Web3ClientVersion;
import org.web3j.protocol.http.HttpService;

import java.io.IOException;

@Api(value = "Web3j API", tags = {"Web3j."})
@RestController
@RequestMapping("/api/web3j")
public class Web3jTestController {

    @PostMapping()
    @ApiOperation(value = "Web3j 테스트", notes = "Web3j 테스트")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 401, message = "unauthenticated"),
            @ApiResponse(code = 403, message = "unauthorized")
    })
    public String web3ClientVersion() throws IOException {
        Web3j web3j = Web3j.build(new HttpService("http://localhost:7545"));
        Web3ClientVersion web3ClientVersion = web3j.web3ClientVersion().send();;
        System.out.println(web3ClientVersion.getWeb3ClientVersion());

        return web3ClientVersion.getWeb3ClientVersion();
    }

}
