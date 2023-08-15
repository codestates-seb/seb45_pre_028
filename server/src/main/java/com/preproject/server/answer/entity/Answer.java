package com.preproject.server.answer.entity;


import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 한 명의 멤버는 여러 개의 답변을 달 수 있음.
 * answer와 member는 manytoone
 *
 * 한 개의 질문에 여러 개의 답변을 달 수 있음.
 * answer와 question은 manytoone
 *
 */

@Getter
@Setter
@Entity
public class Answer {


    // 답변id
    // @Setter(AccessLevel.NONE)로 해당 필드에 대해서만 Setter 메서드를 생성하지 않도록 지정 -> 변하면 안되는 값이기 때문
    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    // 답변 내용
    // TEXT 형식으로 NULL값은 X
    @Column(columnDefinition = "TEXT")
    private String content;

//    // 멤버와 ManyToOne 관계 설정
//    @ManyToOne
//    @JoinColumn
//    private Member member;
//
//    // 질문과 ManyToOne 관계 설정
//    @ManyToOne
//    @JoinColumn
//    private Question question;

//
//    // 엔티티 추가 시 시간 정보 자동 생성
//    @CreatedDate
//    @Column(updatable = false)
//    public LocalDateTime createAt;
//
//    // 엔티티 마지막 수정 시간을 자동으로 기록
//    @LastModifiedDate
//    @Column
//    private LocalDateTime modifiedAt;
}
