package sfrerichs.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A OneThingList.
 */
@Entity
@Table(name = "one_thing_list")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OneThingList implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "my_text")
    private String myText;

    @OneToOne(mappedBy = "oneThingList")
    @JsonIgnore
    private ThingsList thingsList;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMyText() {
        return myText;
    }

    public OneThingList myText(String myText) {
        this.myText = myText;
        return this;
    }

    public void setMyText(String myText) {
        this.myText = myText;
    }

    public ThingsList getThingsList() {
        return thingsList;
    }

    public OneThingList thingsList(ThingsList thingsList) {
        this.thingsList = thingsList;
        return this;
    }

    public void setThingsList(ThingsList thingsList) {
        this.thingsList = thingsList;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OneThingList)) {
            return false;
        }
        return id != null && id.equals(((OneThingList) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OneThingList{" +
            "id=" + getId() +
            ", myText='" + getMyText() + "'" +
            "}";
    }
}
