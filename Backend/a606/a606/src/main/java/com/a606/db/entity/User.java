package com.a606.db.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@DynamicInsert
@DynamicUpdate
@Entity
@Getter
@Setter
@Table(indexes = {@Index(name="UK_USER_WALLET", columnList = "wallet", unique = true)})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long id = null;

    @CreatedDate
    @Column(updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime lastModifiedDate;

    //wallet
    @Column(nullable = false)
    private String wallet;
    //nickname
    @Column(nullable = false)
    private String nickname;
    //gamepoint
    @Column(nullable = false, columnDefinition = "BIGINT(20) DEFAULT 0")
    private Long gamePoint;
    //is_delete
    @Column(nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
    private boolean isDelete;

}
