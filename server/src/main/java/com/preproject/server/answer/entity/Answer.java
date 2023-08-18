package com.preproject.server.answer.entity;


import com.preproject.server.member.entity.Member;
import com.preproject.server.question.entity.Question;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 한 명의 멤버는 여러 개의 답변을 달 수 있음.
 * answer와 member는 manytoone
 *
 * 한 개의 질문에 여러 개의 답변을 달 수 있음.
 * answer와 question은 manytoone
 *
 *
 *
 * @CreatedDate, @LastModifiedDate가 자동으로 생성일자, 시간 등을 처리해주는데 이 애너테이션을 사용하려면
 * Spring Data JPA의 Auditing 관련 설정을 해줘야함
 *
 * 1)
 * @EntityListeners(AuditingEntityListener.class)를 클래스에 추가.
 * 어노테이션을 엔티티 클래스에 추가하면 Spring Data JPA가 감사 리스너를 활성화하여 엔티티의 생성 및 수정 시간을 자동으로 관리
 *
 * 2)
 * @EnableJpaAuditing 어노테이션을 메인 애플리케이션 클래스나 JPA 설정 클래스에 추가하여 JPA 감사(Auditing)를 활성화
 *
 */

@Getter
@Setter
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Answer {


    // 답변id
    // @Setter(AccessLevel.NONE)로 해당 필드에 대해서만 Setter 메서드를 생성하지 않도록 지정 -> 변하면 안되는 값이기 때문
    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    // 답변 내용
    // TEXT 형식으로 NULL값은 X
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;


    // @CreatedDate, @LastModifiedDate가 생성이랑 수정 시간을 자동으로 설정해줌.
    // 이 애너테이션을 사용하려면 추Spring Data JPA의 Auditing 관련 설정을 해줘야함
    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime modifiedAt;

    // 멤버와 ManyToOne 관계 설정
    @ManyToOne
    @JoinColumn
    private Member member;

    // 질문과 ManyToOne 관계 설정
    @ManyToOne
    @JoinColumn
    private Question question;


    // 질문 답변 양방향 관계 설정. Answer 객체에 질문을 추가
    public void setQuestion(Question question) {
        this.question = question;

        if (!this.question.getAnswers().contains(this)) {
            this.question.setAnswer(this);
        }
    }

    // 회원과 답변 양방향 관계 설정
    public void setMember(Member member) {
        this.member = member;

        if (!this.member.getAnswers().contains(this)) {
            this.member.addAnswer(this);
        }
    }
}


