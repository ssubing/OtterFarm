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
public class Avatar {

    @Id
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    //head
    @Column(nullable = false)
    private Long head;
    //eyes
    @Column(nullable = false)
    private Long eyes;
    //mouth
    @Column(nullable = false)
    private Long mouth;
    //hands
    @Column(nullable = false)
    private Long hands;
    //fashion
    @Column(nullable = false)
    private Long fashion;
}
