package com.a606.db.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@DynamicInsert
@DynamicUpdate
@Entity
@Getter
@Setter
public class UserPage {
    @Id
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    private NFT nft;
}
