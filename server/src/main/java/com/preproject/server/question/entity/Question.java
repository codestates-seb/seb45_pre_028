package com.preproject.server.question.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;
import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionStatus questionStatus = QuestionStatus.QUESTION_REGISTERED;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime modifiedAt;


//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID") // 테이블명
//    private Member member;
//
//    @OneToMany(mappedBy = "question")
//    private Answer answer;
//

    // Member 엔티티에 추가할 매핑 (참고)
    // @OneToMany(mappedby = "member")
    //private List<Order> orders = new ArrayList();



    public enum QuestionStatus {
        QUESTION_REGISTERED("질문 등록"),
        QUESTION_ANSWERED("답변 완료"),
        QUESTION_DELETED("질문 삭제");

        @Getter
        private String string;

        QuestionStatus(String string) {
            this.string = string;
        }
    }



}
