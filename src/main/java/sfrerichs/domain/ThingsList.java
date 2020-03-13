package sfrerichs.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

import sfrerichs.domain.enumeration.Time;

/**
 * A ThingsList.
 */
@Entity
@Table(name = "things_list")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ThingsList implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "list_time")
    private Time listTime;

    @ManyToMany(mappedBy = "thingsLists")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Thing> things = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Time getListTime() {
        return listTime;
    }

    public ThingsList listTime(Time listTime) {
        this.listTime = listTime;
        return this;
    }

    public void setListTime(Time listTime) {
        this.listTime = listTime;
    }

    public Set<Thing> getThings() {
        return things;
    }

    public ThingsList things(Set<Thing> things) {
        this.things = things;
        return this;
    }

    public ThingsList addThing(Thing thing) {
        this.things.add(thing);
        thing.getThingsLists().add(this);
        return this;
    }

    public ThingsList removeThing(Thing thing) {
        this.things.remove(thing);
        thing.getThingsLists().remove(this);
        return this;
    }

    public void setThings(Set<Thing> things) {
        this.things = things;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ThingsList)) {
            return false;
        }
        return id != null && id.equals(((ThingsList) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ThingsList{" +
            "id=" + getId() +
            ", listTime='" + getListTime() + "'" +
            "}";
    }
}
